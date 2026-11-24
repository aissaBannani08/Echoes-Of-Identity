// scripts/countStories.ts
import { getPublishedStories } from '../src/content/stories/index';
console.log('Published story count:', getPublishedStories().length);
