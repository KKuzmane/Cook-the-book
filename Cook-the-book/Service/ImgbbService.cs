using Cook_the_book.Service.Interfaces;
using Newtonsoft.Json.Linq;

namespace Cook_the_book.Services
{
    public class ImgbbService : IImgbbService
    {
        private readonly IConfiguration _configuration;
        private readonly string _imgbbApiKey;
        private const string ImgbbUploadUrl = "https://api.imgbb.com/1/upload";

        public ImgbbService(IConfiguration configuration)
        {
            _configuration = configuration;
            _imgbbApiKey = _configuration.GetValue<string>("ImgbbApiKey");
        }

        public async Task<string> UploadPhoto(IFormFile photo)
        {
            try
            {
                if (photo == null || photo.Length == 0)
                    throw new ArgumentException("No photo uploaded.");

                byte[] photoBytes;
                using (var memoryStream = new MemoryStream())
                {
                    await photo.CopyToAsync(memoryStream);
                    photoBytes = memoryStream.ToArray();
                }

                string base64Image = Convert.ToBase64String(photoBytes);

                var imageUrl = await UploadToImgbb(base64Image);

                return imageUrl;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        private async Task<string> UploadToImgbb(string base64Image)
        {
            using (var httpClient = new HttpClient())
            {
                var formData = new MultipartFormDataContent();
                formData.Add(new StringContent(_imgbbApiKey), "key");
                formData.Add(new StringContent(base64Image), "image");

                var response = await httpClient.PostAsync(ImgbbUploadUrl, formData);
                response.EnsureSuccessStatusCode();

                var responseContent = await response.Content.ReadAsStringAsync();
                var imageUrl = ExtractImageUrl(responseContent);

                return imageUrl;
            }
        }

        private string ExtractImageUrl(string responseContent)
        {
            var jsonObject = JObject.Parse(responseContent);
            var imageUrl = (string)jsonObject["data"]["url"];

            return imageUrl;
        }
    }
}
