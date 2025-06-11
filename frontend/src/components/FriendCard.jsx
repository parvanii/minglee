import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitialize } from "../lib/utils";


const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-white border border-purple-200 hover:shadow-md transition-shadow rounded-xl">
      <div className="card-body p-4 space-y-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="avatar size-12 rounded-full overflow-hidden">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold text-purple-800 truncate">{friend.fullName}</h3>
        </div>

        {/* LANGUAGE INFO */}
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-purple-100 text-purple-700 border border-purple-300 text-xs font-medium">
            {getLanguageFlag(friend.fluentIn)}
            Fluent In: {friend.fluentIn}
          </span>
          <span className="badge bg-purple-100 text-purple-700 border border-purple-300 text-xs font-medium">
  {getLanguageFlag(friend.currLearning)} Currently Learning: {capitialize(friend.currLearning)}
</span>


        </div>

        {/* MESSAGE BUTTON */}
        <Link to={`/chat/${friend._id}`} className="btn btn-outline border-purple-500 text-purple-700 hover:bg-purple-50 w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${language} flag`}
        className="h-3 mr-1 inline-block rounded-sm"
      />
    );
  }
  return null;
}
