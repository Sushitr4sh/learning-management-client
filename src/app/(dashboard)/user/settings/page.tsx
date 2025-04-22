import SharedNotificationSettings from "@/components/SharedNotificationSettings";
import React from "react";

const UserSettings = () => {
  return (
    <div className="w-3/5">
      {/* Will be the same as the one in teacher page that's why we're creating a reusable component*/}
      <SharedNotificationSettings
        title="User Settings"
        subtitle="Manage your user notification settings"
      />
    </div>
  );
};

export default UserSettings;
