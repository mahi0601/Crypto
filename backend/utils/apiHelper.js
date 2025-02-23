exports.handleApiRequest = async (url, params) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error('API request failed');
    }
};
