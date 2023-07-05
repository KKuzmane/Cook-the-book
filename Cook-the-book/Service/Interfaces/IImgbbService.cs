namespace Cook_the_book.Service.Interfaces
{
    public interface IImgbbService
    {
        Task<string> UploadPhoto(IFormFile photo);
    }
}
