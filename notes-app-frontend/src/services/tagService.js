import axios from 'axios';

const getTags = async () => {
  return await axios.get(`/api/v1/tags/getTags`);    
};

const manipulateTags = async (tag, query) => {
  if (tag.text === 'All Notes') {
    return await axios.get(`/api/v1/tags/manipulateTags?funct=${query}&&tagId=${-1}&&tagText=${tag.text}`);
  } else {
    return await axios.get(`/api/v1/tags/manipulateTags?funct=${query}&&tagId=${tag.tagId}&&tagText=${tag.text.replace(/\n/g, "\\n")}`);
  }
};

export default { getTags, manipulateTags };