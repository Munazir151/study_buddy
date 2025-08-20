import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, Image, Video, Music, X, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  summary?: string;
  flashcards?: number;
  quiz?: number;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === 'uploading') {
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            setTimeout(() => simulateProcessing(fileId), 500);
            return { ...file, progress: 100, status: 'processing' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const simulateProcessing = (fileId: string) => {
    setTimeout(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            status: 'completed',
            summary: 'AI-generated summary and study materials have been created from your document.',
            flashcards: Math.floor(Math.random() * 20) + 5,
            quiz: Math.floor(Math.random() * 10) + 3
          };
        }
        return file;
      }));
    }, 2000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
    if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <UploadIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-indigo-600">File Upload</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mp3"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <UploadIcon className="w-8 h-8 text-indigo-500" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Drop your files here, or click to browse
                </h3>
                <p className="text-gray-600">
                  Upload documents, images, videos, or audio files to generate study materials
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">PDF</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">DOC</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">PPT</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Images</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Videos</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Audio</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* File List */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-6">Uploaded Files</h2>
            <div className="space-y-4">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl"
                >
                  <div className="flex-shrink-0 text-gray-500">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>{formatFileSize(file.size)}</span>
                      <span className="capitalize">{file.status}</span>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    {file.status === 'processing' && (
                      <div className="text-sm text-blue-600">
                        AI is analyzing your file and generating study materials...
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <div className="space-y-2">
                        <p className="text-sm text-green-600">{file.summary}</p>
                        <div className="flex space-x-4 text-sm">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {file.flashcards} Flashcards Generated
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                            {file.quiz} Quiz Questions Created
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button className="text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition-colors">
                            View Summary
                          </button>
                          <button className="text-sm bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors">
                            Study Flashcards
                          </button>
                          <button className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors">
                            Take Quiz
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="text-sm text-red-600">
                        Failed to process file. Please try again.
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mt-8"
        >
          <h2 className="text-xl font-bold mb-6">What happens after upload?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-bold text-lg mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your content and extracts key concepts, definitions, and important information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📇</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Smart Flashcards</h3>
              <p className="text-gray-600">
                Automatically generated flashcards help you memorize key concepts and terms from your materials.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Practice Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with AI-generated quizzes based on your uploaded content.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
