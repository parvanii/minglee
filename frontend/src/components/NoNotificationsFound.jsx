import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="size-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
        <BellIcon className="size-8 text-purple-700 opacity-50" />
      </div>
      <h3 className="text-lg font-semibold text-purple-800 mb-2">No notifications yet</h3>
      <p className="text-sm text-purple-700 opacity-70 max-w-md">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;
