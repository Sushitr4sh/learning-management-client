"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { useUpdateUserMutation } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormField } from "./CustomFormField";
import Header from "./Header";

const SharedNotificationSettings = ({
  title = "Notification Settings",
  subtitle = "Manage your notification settings",
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();

  /* When querying before, we use object instead of array. When we use mutation we're using array, which gives us a function we can invoke to update our user on the backend */
  const [updateUser] = useUpdateUserMutation();

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          /* Data that we have currently */
          ...currentSettings,
          /* Data that is going to be the new information */
          ...data,
        },
      },
    };

    try {
      updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user settings: ", error);
    }
  };

  if (!user) return <div>Please sign in to manage your settings</div>;

  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            <CustomFormField
              name="courseNotifications"
              label="Course Notification"
              type="switch"
            />
            <CustomFormField
              name="emailAlerts"
              label="Email Alerts"
              type="switch"
            />
            <CustomFormField
              name="smsAlerts"
              label="SMS Alerts"
              type="switch"
            />
            <CustomFormField
              name="notificationFrequency"
              label="Notification Frequency"
              type="select"
              initialValue="daily"
              options={[
                { value: "immediate", label: "Immediate" },
                { value: "daily", label: "daily" },
                { value: "weekly", label: "Weekly" },
              ]}
            />
          </div>

          <Button type="submit" className="notification-settings__submit">
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SharedNotificationSettings;
