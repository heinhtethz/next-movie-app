import { Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="flex justify-center h-screen mt-10">
      <Spinner size="3" />
    </div>
  );
}
