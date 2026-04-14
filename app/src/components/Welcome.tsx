import { Play } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
        Dota2 <span className="text-red-600">人格</span>测试
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
        你是团队的耗材辅助，还是理论无敌的嘴炮怪？
        完成 40 道灵魂拷问，测测你在 Dota2 里的真实人格底色。
      </p>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 w-full text-left">
        <h2 className="text-xl font-bold mb-4 text-gray-800">测试须知</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="text-red-500 mr-2 font-bold">•</span>
            共 40 道单选题，凭第一直觉作答
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2 font-bold">•</span>
            本测试纯属自嘲玩梗，切勿对号入座破防
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2 font-bold">•</span>
            请在没有队友监视的安全环境下进行测试
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/30"
      >
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
        <span className="relative flex items-center gap-2">
          开始承受拷打
          <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );
}
