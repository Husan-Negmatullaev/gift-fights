import { CreateLobbyForm } from '@/widgets/create-lobby-form';

export const CreateLobby = () => {
  return (
    <section className="px-6 pb-22 pt-5 relative">
      <h1 className="font-bold text-xl text-white mb-7">Создание лобби</h1>

      <CreateLobbyForm />
    </section>
  );
};
