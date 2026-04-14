import { useRef, useState } from 'react';
import type { Result as ResultType } from '../data/results';
import { Share2, RefreshCcw, Loader2 } from 'lucide-react';
import spriteImage from '../assets/Gemini_Generated_Image_lbzl80lbzl80lbzl.png';
import html2canvas from 'html2canvas';

interface ResultProps {
  result: ResultType;
  score: number;
  onRestart: () => void;
}

export function Result({ result, score, onRestart }: ResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!resultRef.current || isSharing) return;

    try {
      setIsSharing(true);
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, // 提高清晰度
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const dataUrl = canvas.toDataURL('image/png');

      // 如果浏览器支持原生分享（移动端多见），则尝试调用原生分享
      if (navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], `Dota2人格-${result.title}.png`, { type: 'image/png' });
          await navigator.share({
            title: '我的 Dota2 人格底色',
            text: `我是【${result.title}】，快来测测你的Dota2人格吧！`,
            files: [file],
          });
          return;
        } catch (e) {
          console.log('Share API failed or cancelled, falling back to download', e);
        }
      }

      // 降级为触发下载
      const link = document.createElement('a');
      link.download = `Dota2人格鉴定-${result.title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
      alert('生成图片失败，请稍后重试');
    } finally {
      setIsSharing(false);
    }
  };

  // Calculate sprite positions based on id (1-25)
  // Grid is 5x5
  const index = result.id - 1;
  const col = index % 5;
  const row = Math.floor(index / 5);

  // Using percentages for background-position
  // 5 columns -> 4 intervals -> 100% / 4 = 25%
  const posX = col * 25;
  const posY = row * 25;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-gray-500 uppercase tracking-widest mb-2">
          你的 Dota2 人格底色
        </h2>
        <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm mb-4">
          综合得分: {score}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          {result.title}
        </h1>
        <p className="text-2xl font-bold text-red-600 mb-8 italic">
          "{result.core}"
        </p>
      </div>

      <div
        ref={resultRef}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden w-full mb-10 transform transition-all hover:scale-[1.01] duration-300"
      >
        <div className="relative w-full aspect-square md:aspect-video bg-gray-200">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${spriteImage})`,
              backgroundSize: '500% 500%', // Because it's a 5x5 grid
              backgroundPosition: `${posX}% ${posY}%`,
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 pointer-events-none">
            <span className="text-white font-medium text-lg shadow-sm">
              鉴定结果报告
            </span>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-1 bg-red-500 rounded-full"></span>
              临床症状
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              {result.selfMockery}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-1 bg-gray-800 rounded-full"></span>
              终极确诊
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              {result.darkHumor}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95"
        >
          <RefreshCcw className="w-5 h-5" />
          重新测试
        </button>
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors active:scale-95 shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
          {isSharing ? '生成病历中...' : '炫耀病历'}
        </button>
      </div>
    </div>
  );
}
