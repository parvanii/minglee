import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-purple-800 tracking-tight mb-6">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner text-purple-600 loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-800">
                  <UserCheckIcon className="h-5 w-5 text-purple-600" />
                  Friend Requests
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-white border border-purple-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-purple-100">
                              <img src={request.sender.profilePic} alt={request.sender.fullName} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-purple-800">{request.sender.fullName}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="text-xs bg-purple-100 text-purple-700 rounded px-2 py-0.5">
                                  Fluent In: {request.sender.fluentIn}
                                </span>
                                <span className="text-xs border border-purple-300 text-purple-700 rounded px-2 py-0.5">
                                  Currently Learning: {request.sender.currLearning}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-800">
                  <BellIcon className="h-5 w-5 text-purple-600" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="bg-white border border-purple-200 rounded-lg shadow-sm"
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full bg-purple-100">
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-purple-800">{notification.recipient.fullName}</h3>
                            <p className="text-sm my-1 text-purple-700">
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center text-purple-600 opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="bg-green-100 text-green-700 text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1">
                            <MessageSquareIcon className="h-3 w-3" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
