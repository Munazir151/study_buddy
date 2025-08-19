import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Image as ImageIcon, X, Trash2 } from 'lucide-react';

type UploadedItem = {
  id: string;
  file: File;
  previewUrl?: string;
};

const humanFileSize = (size: number) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (!size && '0 B') || `${(size / Math.pow(1024, i)).toFixed(1)} ${['B','KB','MB','GB','TB'][i]}`;
};

const UploadWidget: React.FC = () => {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newItems: UploadedItem[] = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
    setItems((prev) => [...newItems, ...prev]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    multiple: true,
  });

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const uploadSummary = useMemo(() => {
    const total = items.length;
    const totalSize = items.reduce((sum, i) => sum + i.file.size, 0);
    return { total, totalSize };
  }, [items]);

  const simulateUpload = async () => {
    if (items.length === 0) return;
    setIsUploading(true);
    // Simulate upload
    await new Promise((r) => setTimeout(r, 1200));
    setIsUploading(false);
    alert('Files queued. In a real app, they would be processed for summaries/flashcards.');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragActive ? 'border-blue-400 bg-blue-50/40 dark:border-blue-500/60 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-gray-900 dark:text-white font-medium">Drop files here, or click to upload</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PDF, images, or text files</p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {uploadSummary.total} file{uploadSummary.total !== 1 ? 's' : ''} • {humanFileSize(uploadSummary.totalSize)}
            </div>
            <button
              onClick={simulateUpload}
              disabled={isUploading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
            >
              {isUploading ? 'Uploading…' : 'Process Files'}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {item.previewUrl ? (
                    <img src={item.previewUrl} alt={item.file.name} className="w-full h-full object-cover" />
                  ) : item.file.type === 'application/pdf' ? (
                    <FileText className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.file.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{humanFileSize(item.file.size)}</div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;


