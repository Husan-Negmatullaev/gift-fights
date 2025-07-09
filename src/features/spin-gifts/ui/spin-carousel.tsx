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
  onSelected(): void;
  onRefetchLobby(): void;
  lobby: GetLobbyQuery["lobby"];
  onRefreshAfterJoining(): void;
};

export const SpinCarousel = (props: SpinCarouselProps) => {
  const { onSelected, lobby, onRefreshAfterJoining, onRefetchLobby } = props;
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [gameTimer, setGameTimer] = useState(15);
  const [countdown, setCountdown] = useState<number>(lobby.timeToStart);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<LobbyStatus>(lobby.status);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // console.log('lobby.timeToStart', lobby.timeToStart);
  // console.log('countdown', countdown);

  const participants = lobby.participants;

  const hasEnoughPlayers = participants.length >= 2;

  const handleAutoSpin = useCallback(
    (winnerId: string) => {
      // if (!hasEnoughPlayers) return;
      console.log("handleAutoSpin", winnerId);
      console.log(
        "handleAutoSpin",
        participants.map((participant) => participant.userId),
      );
      setGamePhase(LobbyStatus.InProcess);
      setIsSpinning(true);
      setGameTimer(5);

      const spins = 5 + Math.random() * 5;
      const finalRotation = rotation + spins * 360 + Math.random() * 360;
      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);

        // const currentSegmentAngle = 360 / participants.length;
        // const normalizedRotation = (360 - (finalRotation % 360)) % 360;

        // Find winner by userId, fallback to random selection if not found
        const selectedIndex = participants.findIndex(
          (participant) => participant.userId === Number(winnerId),
        );

        // const segmentAngle = 360 / participants.length;
        // const normalizedRotation = (360 - (finalRotation % 360)) % 360;
        // // const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
        // const selectedIndex = participants.findIndex(
        //   (participant) => participant.userId === Number(winnerId),
        // );
        console.log("selectedIndex", selectedIndex);
        setSelectedSegment(selectedIndex);

        // Start celebration phase with highlighting
        setGamePhase(LobbyStatus.Completed);
        setIsHighlighting(true);

        // After 800ms, move to finished state
        setTimeout(() => {
          onSelected();
          // setGamePhase(LobbyStatus.Completed);
          setIsHighlighting(false);
        }, 800);
      }, 5000);
    },
    [onSelected, participants, rotation],
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gamePhase === LobbyStatus.Countdown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (gamePhase === LobbyStatus.Countdown && countdown === 0) {
      // For demo purposes, simulate a winner ID - in real usage you'd get this from your backend
      // const demoWinnerId =
      //   participants.length > 0
      //     ? participants[
      //         Math.floor(Math.random() * participants.length)
      //       ].userId.toString()
      //     : Math.floor(Math.random() * participants.length).toString();
      // handleAutoSpin(demoWinnerId);
    }

    return () => clearTimeout(timer);
  }, [countdown, gamePhase, participants, handleAutoSpin]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gamePhase === LobbyStatus.InProcess && gameTimer > 0) {
      timer = setTimeout(() => setGameTimer(gameTimer - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [gameTimer, gamePhase]);

  // const handleManualSpin = () => {
  //   if (
  //     isSpinning ||
  //     gamePhase !== LobbyStatus.WaitingForPlayers
  //     // !hasEnoughPlayers
  //   )
  //     return console.log('VAGINA');
  //   console.log('PENIS');

  //   onRefetchLobby();
  //   // handleAutoSpin();
  // };

  const getPhaseText = () => {
    if (!hasEnoughPlayers) {
      return "Need 2+ players";
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
          ? // ? segments[selectedSegment].value
            participants[selectedSegment].user.username
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

  useUserJoinedToLobbySocket(lobby.id, (payload) => {
    console.log("Кто-то присоединился к лобби!", payload);
    onRefreshAfterJoining();
  });

  useLobbyCountdownSubscription(lobby.id, (payload) => {
    console.log("Обратный отсчет начался!", payload);
    if (gameStarted) return;
    setGamePhase(LobbyStatus.Countdown);
    // setIsSpinning(true);
    onRefetchLobby();
    setGameStarted(true);
    setGamePhase(LobbyStatus.Countdown);
    setCountdown(lobby.timeToStart);
  });

  useLobbyProcessSubscription(lobby.id, (_payload) => {
    // setGamePhase(LobbyStatus.InProcess);
    // handleManualSpin();
    // console.log("Начался процесс поиска победителя!", payload);
  });

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    // console.log("Победитель найден!", payload);
    // setGamePhase(LobbyStatus.InProcess);
    // handleManualSpin();

    // console.log("useLobbyWinnerSubscription", payload);

    // handleAutoSpin(payload.payload.winnerId);
    // setTimeout(() => {
    //   // setGamePhase(LobbyStatus.Completed);
    // }, 10);

    // const demoWinnerId =
    //   participants.length > 0
    //     ? participants[
    //         Math.floor(Math.random() * participants.length)
    //       ].userId.toString()
    //     : Math.floor(Math.random() * participants.length).toString();
    handleAutoSpin(payload.payload.winnerId);
  });

  // Подписываемся на все события лобби
  // useLobbyNotifications(lobby.id, {
  //   onUserJoined: (payload) => {
  //     console.log('Кто-то присоединился к лобби!', payload);
  //     // Можно обновить список участников или показать уведомление
  //   },

  //   onCountdown: (payload) => {
  //     console.log('Обратный отсчет начался!', payload);
  //     // Запускаем обратный отсчет с начальным значением из лобби
  //     setCountdown(lobby.timeToStart);
  //     setGamePhase('waiting');
  //   },

  //   onProcess: (payload) => {
  //     console.log('Начался процесс поиска победителя!', payload);
  //     // Автоматически запускаем спиннер
  //     handleAutoSpin();
  //   },

  //   onWinner: (payload) => {
  //     console.log('Победитель найден!', payload);
  //     // Можно показать результат или обновить UI
  //     // Здесь можно добавить логику для отображения победителя
  //     // например, найти индекс победителя в списке участников
  //     const winnerIndex = participants.findIndex(
  //       (participant) => participant.userId === Number(payload.winnerId),
  //     );
  //     if (winnerIndex !== -1) {
  //       setSelectedSegment(winnerIndex);
  //       setGamePhase('celebrating');
  //       setIsHighlighting(true);

  //       // Через некоторое время переходим в состояние finished
  //       setTimeout(() => {
  //         setGamePhase('finished');
  //         setIsHighlighting(false);
  //       }, 2000);
  //     }
  //   },
  // });

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
