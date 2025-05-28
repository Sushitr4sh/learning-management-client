import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();

  const courseId = searchParams.get("id") ?? "";
  // 10 is the radix parameter which specifies the number base to use for parsing the string (0-9)
  const checkoutStep = parseInt(searchParams.get("step") ?? "1", 10);

  const navigateToStep = useCallback(
    (step: number) => {
      // Make sure step  isn'tt below 1 and exceed 3
      const newStep = Math.min(Math.max(1, step), 3);
      // Show the authentication component if the user is not signed in
      const showSignUp = isSignedIn ? "true" : "false";

      router.push(
        `/checkout?step=${newStep}&id=${courseId}&showSignUp=${showSignUp}`,
        { scroll: false },
      );
    },
    [courseId, isSignedIn, router],
  );

  useEffect(() => {
    // We don't want user to hit the payment details page if they're not signed in, and we'll redirect them back to step 1
    if (isLoaded && !isSignedIn && checkoutStep > 1) {
      navigateToStep(1);
    }
  }, [isLoaded, isSignedIn, checkoutStep, navigateToStep]);

  return { checkoutStep, navigateToStep };
};
