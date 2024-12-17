import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

const TestGPT = () => {
  const [input, setInput] = useState(""); // 사용자 입력 상태
  const [response, setResponse] = useState(""); // 서버 응답 상태

  // 채팅 프롬프트 테스트 /gpt/chat-completion
  const postTestChatController = async () => {
    console.log("질문", input);
    const data = [
      {
        role: "user",
        content: input
      }
    ];
    const response = await axiosInstance.post("/gpt/chat-completion", data);
    console.log(response.data.data.choices[0].message.content);
    const responseChat = response.data.data.choices[0].message.content;
    setResponse(responseChat);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">React Test Page</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="테스트할 프롬프트 입력"
        className="mb-4 w-80 rounded border border-gray-300 px-4 py-2"
      />

      {/* 테스트 버튼 */}
      <button onClick={postTestChatController} className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        API 테스트
      </button>

      {/* API 응답 결과 */}
      {response && (
        <div className="mt-6 w-96 rounded border border-gray-300 bg-white p-4">
          <h2 className="font-semibold">서버 응답:</h2>
          <p className="mt-2 text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default TestGPT;
