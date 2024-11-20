import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileOverview = ({ profile }) => {
  if (!profile) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar} alt={profile.firstName} />
          <AvatarFallback>{profile.firstName?.[0]}{profile.lastName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{profile.about}</p>
        {profile.linkedIn && (
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" 
             className="mt-4 text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
            LinkedIn Profile
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
