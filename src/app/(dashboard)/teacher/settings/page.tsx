import SharedNotificationSettings from "@/components/SharedNotificationSettings";
import React from "react";

const TeacherSettings = () => {
  return (
    <div className="w-3/5">
      {/* Will be the same as the one in teacher page that's why we're creating a reusable component*/}
      <SharedNotificationSettings
        title="Teacher Settings"
        subtitle="Manage your teacher notification settings"
      />
    </div>
  );
};

export default TeacherSettings;
