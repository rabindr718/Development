public class IncrementOrder {
    public static void printArray(int arr[]){
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");
        }
    }public static void main(String[] args) {
        int arr[]={4,5,5,7687,9,6,7,43,1,14};
        for(int i=0; i<arr.length-1;i++){
            for (int j=0; j<arr.length-i-1; j++){
                if(arr[j]>arr[j+1]){
                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
        printArray(arr);
    }
}




















