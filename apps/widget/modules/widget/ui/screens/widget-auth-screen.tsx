import z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useSetAtom, useAtomValue } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  organizationIdAtom,
  contactSessionIdAtomFamily,
} from "../../atoms/widget-atoms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import { Doc } from "@workspace/backend/_generated/dataModel";
import VerticalCutReveal from "@workspace/ui/components/vertical-cut-reveal";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email Address"),
});

type FormValues = z.infer<typeof formSchema>;

export function WidgetAuthScreen() {
  const organizationId = useAtomValue(organizationIdAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId as string)
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);

  const onSubmit = async (values: FormValues) => {
    if (!organizationId) return;

    const metadata: Doc<"contactSession">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      screenResolution: `width:${screen.width}, height:${screen.height}`,
      viewPortSize: `width:${window.innerWidth}, height:${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset().toString(),
      cookieEnabled: navigator.cookieEnabled,
      referer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      metadata,
      organizationId,
    });

    setContactSessionId(contactSessionId);
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col font-semibold justify-between gap-y-2 px-2 py-6">
          <p className=" text-3xl ">
            <VerticalCutReveal
              splitBy="lines"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Hi There! 👋
            </VerticalCutReveal>
          </p>

          <p className=" text-lg">
            <VerticalCutReveal
              splitBy="line"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Let&apos;s get started
            </VerticalCutReveal>
          </p>
        </div>
      </WidgetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-y-4 p-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-10"
                    placeholder="arno dorian"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="h-10 bg-background"
                    placeholder="arno@mail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            size="lg"
            type="submit"
          >
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
