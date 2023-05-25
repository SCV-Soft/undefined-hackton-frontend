export const Balance = () => {
  return (
    <div className="flex flex-col gap-4">
      <dl>
        <dt className="text-black/50">Your vETH</dt>
        <dd className="text-xl font-semibold">32.004</dd>
      </dl>

      <dl>
        <dt className="text-black/50">Your scETH</dt>
        <dd className="text-xl font-semibold">2.015</dd>
      </dl>
    </div>
  );
};
