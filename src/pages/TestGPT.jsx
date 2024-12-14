import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

const TestGPT = () => {
  const [input, setInput] = useState(""); // 사용자 입력 상태
  const [response, setResponse] = useState(""); // 서버 응답 상태

  // API 요청 함수
  const handleTestAPI = async () => {
    if (!input.trim()) {
      alert("입력을 해주세요!");
      return;
    }

    try {
      const result = await axiosInstance.post("/gpt/prompt", {
        prompt: input
      });

      setResponse(result.data.response || "응답이 없습니다.");
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setResponse("API 요청 실패! 서버를 확인해주세요.");
    }
  };

  const postPrompt = async () => {
    const data = {
      model: "string",
      messages: [
        {
          role: "string",
          content: "string"
        }
      ]
    };
    const response = await axiosInstance.post("/gpt/prompt", data);
    console.log(response);
  };

  const postLegacyPrompt = async () => {
    const data = {
      model: "string",
      prompt: "string",
      temperature: 0,
      max_tokens: 0
    };
    const response = await axiosInstance.post("/gpt/legacyPrompt", data);
    console.log(response);
  };

  // 모델 리스트 조회 /gpt/modelList
  const getModelList = async () => {
    const response = await axiosInstance.get("/gpt/modelList", {
      headers: {
        "x-api-key": import.meta.env.VITE_GPT_API_KEY
      }
    });
    console.log(response);
  };

  // 모델 조회 /gpt/model
  const getModel = async () => {
    const modelName = "gpt";
    const response = await axiosInstance.get(`/gpt/model?modelName=${modelName}`);
    console.log(response);
  };

  // 단일 프롬프트 테스트 /gpt/completion
  const postTestController = async () => {
    const data = {
      model: "string",
      prompt: "string",
      temperature: 0,
      max_tokens: 0
    };
    const response = await axiosInstance.post("/gpt/completion", data);
    console.log(response);
  };

  // 채팅 프롬프트 테스트 /gpt/chat-completion
  const postTestChatController = async () => {
    const data = [
      {
        role: "string",
        content: "string"
      }
    ];
    const response = await axiosInstance.post("/gpt/chat-completion", data);
    console.log(response);
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
      <button onClick={handleTestAPI} className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        API 테스트
      </button>

      {/* API 응답 결과 */}
      {response && (
        <div className="mt-6 w-96 rounded border border-gray-300 bg-white p-4">
          <h2 className="font-semibold">서버 응답:</h2>
          <p className="mt-2 text-gray-700">{response}</p>
        </div>
      )}

      <button onClick={postPrompt} className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        gpt/prompt
      </button>
      <button onClick={postLegacyPrompt} className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        gpt/legacyPrompt
      </button>
      <button onClick={getModelList} className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        모델 리스트 조회 /gpt/modelList
      </button>
      <button onClick={getModel} className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        모델 조회 /gpt/model
      </button>
      <button onClick={postTestController} className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
        단일 프롬프트 테스트 /gpt/completion
      </button>
      <button
        onClick={postTestChatController}
        className="my-3 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        채팅 프롬프트 테스트 /gpt/chat-completion
      </button>
    </div>
  );
};

export default TestGPT;
