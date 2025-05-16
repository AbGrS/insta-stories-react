import data from '../data/stories.json';

export interface Story {
  id: number;
  imgUrl: string;
  duration?: number;
}
export interface Stories {
  id: number;
  profile_pic: string;
  stories: Story[];
}

export const fetchStories = async (): Promise<Stories[]> => {
  return new Promise((resolve) => {
    resolve(data);
    //setTimeout(() => resolve(data), 500);
  });
};