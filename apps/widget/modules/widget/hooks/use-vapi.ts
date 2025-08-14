import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user " | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    const vapiInstace = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
    setVapi(vapiInstace);

    vapiInstace.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstace.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstace.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstace.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstace.on("error", (error) => {
      setIsConnecting(false);
      console.error("ERROR_IN_VAPI_INSTANCE", error);
    });

    vapiInstace.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user " : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstace.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);

    if (vapi) vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_KEY!);
  };

  const endCall = () => {
    if (vapi) vapi.stop();
  };

  return {
    endCall,
    startCall,
    transcript,
    isSpeaking,
    isConnected,
    isConnecting,
  };
};
