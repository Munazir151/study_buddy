import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Upload, Wand2, BookOpen } from 'lucide-react';
import { useFlashcardsStore } from '../../stores/flashcardsStore';
import Button from '../UI/Button';

interface DeckCreatorProps {
  onClose: () => void;
}

const DeckCreator: React.FC<DeckCreatorProps> = ({ onClose }) => {
  const { createDeck, generateFlashcardsFromText } = useFlashcardsStore();
  const [step, setStep] = useState<'details' | 'content'>('details');
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [deckCategory, setDeckCategory] = useState('');
  const [deckColor, setDeckColor] = useState('#3B82F6');
  const [contentText, setContentText] = useState('');
  const [creationMethod, setCreationMethod] = useState<'manual' | 'auto' | 'upload'>('manual');

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  const categories = [
    'Mathematics', 'Science', 'History', 'Literature', 
    'Languages', 'Computer Science', 'Medicine', 'General'
  ];

  const handleCreateDeck = () => {
    if (!deckName.trim()) return;

    const deckId = createDeck(
      deckName.trim(),
      deckDescription.trim(),
      deckCategory || 'General',
      deckColor
    );

    if (creationMethod === 'auto' && contentText.trim()) {
      generateFlashcardsFromText(deckId, contentText);
    }

    onClose();
  };

  const handleNext = () => {
    if (creationMethod === 'manual') {
      handleCreateDeck();
    } else {
      setStep('content');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Deck
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {step === 'details' ? 'Set up your flashcard deck' : 'Add content to your deck'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'details' ? (
            <div className="space-y-6">
              {/* Deck Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deck Name *
                </label>
                <input
                  type="text"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  placeholder="e.g., Spanish Vocabulary, Biology Chapter 5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={deckDescription}
                  onChange={(e) => setDeckDescription(e.target.value)}
                  placeholder="Brief description of what this deck covers..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={deckCategory}
                  onChange={(e) => setDeckCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deck Color
                </label>
                <div className="flex space-x-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setDeckColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        deckColor === color ? 'border-gray-400' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Creation Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  How would you like to create cards?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setCreationMethod('manual')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      creationMethod === 'manual'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Manual Creation</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Create an empty deck and add cards manually
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setCreationMethod('auto')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      creationMethod === 'auto'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Wand2 className="w-5 h-5 text-purple-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">AI Auto-Generation</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Paste text and let AI create flashcards automatically
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setCreationMethod('upload')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      creationMethod === 'upload'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Upload className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Upload File</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Upload a document and generate cards from it
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {creationMethod === 'auto' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paste Your Study Material
                  </label>
                  <textarea
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="Paste your notes, textbook content, or any study material here. The AI will automatically generate flashcards from this content..."
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    💡 Tip: The more detailed your content, the better the AI-generated flashcards will be.
                  </p>
                </div>
              )}

              {creationMethod === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Upload Study Material
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports PDF, DOCX, TXT files up to 10MB
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full ${step === 'details' ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 'content' ? 'bg-blue-500' : 'bg-gray-300'}`} />
          </div>
          
          <div className="flex space-x-3">
            {step === 'content' && (
              <Button
                variant="ghost"
                onClick={() => setStep('details')}
              >
                Back
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!deckName.trim()}
            >
              {step === 'details' && creationMethod === 'manual' ? 'Create Deck' : 
               step === 'details' ? 'Next' : 'Create Deck'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeckCreator;
