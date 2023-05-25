import { useModal } from "./useModal";

const TBDMessage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Coming Soon.</h1>
      <div className="divider !my-1" />
      <p className="text-md">
        Our team is working hard to bring it to you as soon as possible.
      </p>
      <p>Stay tuned for updates and thank you for your patience.</p>
    </div>
  );
};

export const useTBD = () => {
  const { modal } = useModal();
  const openTBD = () => modal(<TBDMessage />, "Ok", { blur: true });
  return { openTBD };
};
