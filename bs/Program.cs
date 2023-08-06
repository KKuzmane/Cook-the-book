using System;

namespace bs
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] arr = { 3, -2,  7, 11, 15, 1, 22, 100, 43, 2 };

            for (int i = 0; i < arr.Length; i++)
            {
                for(int j = 0; j < arr.Length - i -1; j++)
                {
                    if (arr[j] > arr[j + 1])
                    {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }

            foreach(var a in arr)
            {
                Console.WriteLine(a);
            }
        }
    }
}
