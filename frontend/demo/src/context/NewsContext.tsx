/* eslint-disable prettier/prettier */
import React, {createContext, useState, useContext, ReactNode} from 'react';
import {News} from '../screen/NewsScreen';

interface NewsContextType {
  newsData: News[];
  setNewsData: React.Dispatch<React.SetStateAction<News[]>>;
  nullData: string | null;
  setNullData: React.Dispatch<React.SetStateAction<string | null>>;
}

// Context 생성
const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({children}: {children: ReactNode}) => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [nullData, setNullData] = useState<string | null>(null);

  return (
    <NewsContext.Provider
      value={{newsData, setNewsData, nullData, setNullData}}>
      {children}
    </NewsContext.Provider>
  );
};

// Context Hook
export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
