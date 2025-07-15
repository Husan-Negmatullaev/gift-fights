import { useState, useEffect, useCallback } from "react";
import { Avatar } from "@/shared/ui/avatar/avatar";
import clsx from "clsx";
import { LobbyStatus, type GetLobbyQuery } from "@/shared/api/graphql/graphql";
import { Icons } from "@/shared/ui/icons/icons";
import { useLobbyCountdownSubscription } from "../hooks/use-lobby-countdown-subscription";
import { useUserJoinedToLobbySocket } from "../hooks/use-user-joined-to-lobby-subscription";
import { useLobbyProcessSubscription } from "../hooks/use-lobby-process-subscription";
import { useLobbyWinnerSubscription } from "../hooks/use-lobby-winner-subscription";

type SpinCarouselProps = {
  gifts: string[];
  onRefetchLobby(): void;
  lobby: GetLobbyQuery["lobby"];
  onRefreshAfterJoining(): void;
  onSelected(winnerId: string): void;
};

export const SpinCarousel = (props: SpinCarouselProps) => {
  const { onSelected, lobby, onRefreshAfterJoining, onRefetchLobby } = props;
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEternalSpinning, setIsEternalSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [gameTimer, setGameTimer] = useState(15);
  const [countdown, setCountdown] = useState<number>(lobby.timeToStart);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<LobbyStatus>(lobby.status);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [pendingWinnerId, setPendingWinnerId] = useState<string | null>(null);

  const participants = lobby.participants;

  const hasEnoughPlayers = participants.length >= 2;

  const getPhaseText = () => {
    if (!hasEnoughPlayers) {
      return "Нужно 2+ игрока";
    }

    switch (gamePhase) {
      case LobbyStatus.WaitingForPlayers:
        return "Ready to start";
      case LobbyStatus.Countdown:
        return `${countdown} сек`;
      case LobbyStatus.InProcess:
        return `${gameTimer} сек`;
      case LobbyStatus.Completed:
        return selectedSegment !== null
          ? participants[selectedSegment].user.username
          : "Game Over";
      default:
        return "Ready to start";
    }
  };

  const getPhaseLabel = () => {
    // console.log('hasEnoughPlayers', hasEnoughPlayers);

    if (!hasEnoughPlayers) {
      return "Waiting:";
    }

    switch (gamePhase) {
      case LobbyStatus.WaitingForPlayers:
        return "Начало через:";
      case LobbyStatus.Countdown:
        return "Начало через:";
      case LobbyStatus.InProcess:
        return "Игра:";
      case LobbyStatus.Completed:
        return "Победитель:";
      default:
        return "Начало через:";
    }
  };

  const getWinnerIconStyle = (segmentIndex: number) => {
    const isWinner = selectedSegment === segmentIndex;
    const isCelebrating = gamePhase === LobbyStatus.Completed && isHighlighting;

    if (isWinner && isCelebrating) {
      return {
        background: "linear-gradient(45deg, #ffd700, #ffed4e, #ffd700)",
        borderColor: "#ffd700",
        boxShadow:
          "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)",
        transform: "translate(-50%, -50%) scale(1.3)",
        animation: "pulse 0.5s ease-in-out infinite alternate",
      };
    } else if (isWinner && gamePhase === LobbyStatus.Completed) {
      return {
        background: "linear-gradient(45deg, #ffd700, #ffed4e)",
        borderColor: "#ffd700",
        boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
        transform: "translate(-50%, -50%) scale(1.2)",
      };
    }

    return {};
  };

  const segmentCount = participants.length;

  // Calculate segment angle dynamically
  // const segmentAngle = 360 / segmentCount;

  // Function to start the eternal spinning phase
  // const startEternalSpin = useCallback(() => {
  //   if (!gameStarted) return;

  //   console.log('Starting eternal spin phase');
  //   setGamePhase(LobbyStatus.InProcess);
  //   setIsEternalSpinning(true);
  //   setGameTimer(5);
  // }, [gameStarted]);

  const stopSpinAndSelectWinner = useCallback(
    (winnerId: string) => {
      if (!isEternalSpinning) return;

      console.log("Stopping spin and selecting winner:", winnerId);

      // Use participants if provided, otherwise fall back to segments
      const activeParticipants = participants;

      console.log(
        "Active participants:",
        activeParticipants.map((participant) => participant.userId),
      );

      // Find winner by userId
      let selectedIndex = activeParticipants.findIndex(
        (participant) => participant.userId === Number(winnerId),
      );

      // If winnerId not found in participants, fall back to random selection
      if (selectedIndex === -1) {
        selectedIndex = Math.floor(Math.random() * activeParticipants.length);
        console.warn(
          `Winner ID ${winnerId} not found in participants, using random selection`,
        );
      }

      console.log("Selected winner index:", selectedIndex);

      // Calculate the target rotation to land on the winner's segment
      const currentSegmentAngle = 360 / activeParticipants.length;
      const targetAngle =
        selectedIndex * currentSegmentAngle + currentSegmentAngle / 2;

      // Add some extra spins for smooth deceleration
      const extraSpins = 2 + Math.random() * 2; // 2-4 extra full rotations
      const finalTargetRotation =
        rotation + extraSpins * 360 + (360 - targetAngle);

      // Stop eternal spinning and start final rotation
      setIsEternalSpinning(false);
      setIsSpinning(true);
      setRotation(finalTargetRotation);

      // After the final spin animation completes
      setTimeout(() => {
        setIsSpinning(false);
        setSelectedSegment(selectedIndex);

        // Start celebration phase with highlighting
        setGamePhase(LobbyStatus.Completed);
        setIsHighlighting(true);

        // After 800ms, call onSelected and stop highlighting
        setTimeout(() => {
          onSelected(winnerId);
          setIsHighlighting(false);
        }, 2000);
      }, 3000); // 3 seconds for the final deceleration animation
    },
    [isEternalSpinning, participants, rotation, onSelected],
  );

  const startEternalSpin = useCallback(() => {
    if (!gameStarted) return;

    setGamePhase(LobbyStatus.InProcess);
    setIsEternalSpinning(true);
    setGameTimer(5);
  }, [gameStarted]);

  const handleAutoSpin = useCallback(
    (winnerId: string) => {
      if (isEternalSpinning) {
        // If already spinning eternally, stop and select winner
        stopSpinAndSelectWinner(winnerId);
      } else {
        // Store winner ID and start eternal spinning
        setPendingWinnerId(winnerId);
        startEternalSpin();
      }
    },
    [isEternalSpinning, stopSpinAndSelectWinner, startEternalSpin],
  );

  useEffect(() => {
    let animationFrame: number;

    if (isEternalSpinning) {
      const animate = () => {
        setRotation((prev) => prev + 10); // Continuous rotation speed
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isEternalSpinning]);

  // Effect to automatically stop spinning if we have a pending winner
  useEffect(() => {
    if (
      isEternalSpinning &&
      pendingWinnerId &&
      gamePhase === LobbyStatus.InProcess
    ) {
      // Simulate receiving the final status after some time
      const timer = setTimeout(() => {
        stopSpinAndSelectWinner(pendingWinnerId);
        setPendingWinnerId(null);
      }, 2000); // Wait 2 seconds before stopping (simulate network delay)

      return () => clearTimeout(timer);
    }
  }, [isEternalSpinning, pendingWinnerId, gamePhase, stopSpinAndSelectWinner]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gamePhase === LobbyStatus.Countdown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (gamePhase === LobbyStatus.Countdown && countdown === 0) {
      // For demo purposes, simulate a winner ID - in real usage you'd get this from your backend
      const demoWinnerId =
        participants.length > 0
          ? participants[
              Math.floor(Math.random() * participants.length)
            ].userId.toString()
          : Math.floor(Math.random() * segmentCount).toString();
      handleAutoSpin(demoWinnerId);
    }

    return () => clearTimeout(timer);
  }, [countdown, gamePhase, participants, segmentCount, handleAutoSpin]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      gamePhase === LobbyStatus.InProcess &&
      gameTimer > 0 &&
      !isEternalSpinning
    ) {
      timer = setTimeout(() => setGameTimer(gameTimer - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [gameTimer, gamePhase, isEternalSpinning]);

  const startGame = () => {
    if (!hasEnoughPlayers || gameStarted) return;

    setGameStarted(true);
    setGamePhase(LobbyStatus.Countdown);
    setCountdown(lobby.timeToStart);
  };

  useUserJoinedToLobbySocket(lobby.id, (payload) => {
    console.log("Кто-то присоединился к лобби!", payload);
    onRefreshAfterJoining();
  });

  useLobbyCountdownSubscription(lobby.id, (payload) => {
    console.log("Обратный отсчет начался!", payload);
    if (gameStarted) return;
    setGamePhase(LobbyStatus.Countdown);
    setIsSpinning(true);
    onRefetchLobby();
    setGameStarted(true);
    setGamePhase(LobbyStatus.Countdown);
    setCountdown(lobby.timeToStart);
  });

  useLobbyProcessSubscription(lobby.id, (_payload) => {
    startGame();
  });

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    handleAutoSpin(payload.payload.winnerId);
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex flex-col items-center">
        <div className={`relative ${!hasEnoughPlayers ? "opacity-60" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl scale-110"></div>
          <div className="relative w-80 h-80 rounded-full">
            <div
              className={clsx(
                hasEnoughPlayers
                  ? "shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]"
                  : "shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-red-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]",
                gamePhase === LobbyStatus.Completed
                  ? "transition-transform duration-300 ease-out"
                  : "",
                "size-full rounded-full relative overflow-hidden transition-transform duration-[5000ms] ease-out ",
              )}
              style={{
                background: "#2D353F",
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: isSpinning
                  ? "cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "ease",
              }}
            >
              {/* Segment Lines */}
              {participants.map((_participant, index) => {
                const segmentAngle = 360 / participants.length;
                return (
                  <div
                    key={index}
                    className="shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)] absolute w-0.5 h-40 top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
                    style={{
                      transform: `translateX(-50%) rotate(${
                        // index * segmentAngle + segmentAngle / 2
                        index * segmentAngle + segmentAngle
                      }deg)`,
                    }}
                  />
                );
              })}

              {/* Icons - Properly Centered in Each Segment */}
              {participants.map((participant, index, list) => {
                const segmentAngle = 360 / list.length;
                const angleInRadians =
                  (index * segmentAngle + segmentAngle / 2) * (Math.PI / 180);
                const radius = 115; // Distance from center
                const x = Math.cos(angleInRadians - Math.PI / 2) * radius;
                const y = Math.sin(angleInRadians - Math.PI / 2) * radius;

                return (
                  <div
                    key={participant.id}
                    className={clsx(
                      selectedSegment === index && isHighlighting
                        ? "animate-pulse"
                        : "",
                      "shadow-[0px_0px_15px_3px_var(--color-blue-350)] absolute rounded-full flex items-center justify-center",
                    )}
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                      ...getWinnerIconStyle(index),
                    }}
                  >
                    <Avatar
                      className="size-6.5"
                      url={participant.user.image ?? ""}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className={clsx(
                gamePhase === LobbyStatus.Completed
                  ? "scale-110 border-yellow-400/70 shadow-yellow-500/30"
                  : "",
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-dark-blue-950 rounded-full flex flex-col items-center justify-center border-15 border-dark-blue box-content",
                !hasEnoughPlayers &&
                  "shadow-[0px_0px_10px_0px_--alpha(var(--color-red-100)_/_50%),0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]",
                hasEnoughPlayers &&
                  "shadow-[0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]",
              )}
            >
              <p className="text-xs mb-px font-medium">{getPhaseLabel()}</p>
              <p
                className={clsx(
                  "text-2xl font-medium line-clamp-2 w-32 mx-auto text-center",
                )}
              >
                {getPhaseText()}
              </p>
            </div>
          </div>

          <Icons
            name="spin-arrow-bottom"
            className="drop-shadow-[0px_0px_6.3px] drop-shadow-blue-100 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-7"
          />
        </div>
      </div>
    </div>
  );
};
