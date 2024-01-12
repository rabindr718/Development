public class First{
    public static void main(String[] args){
        int arr[]={1,2,7,6,4,917,-3};
        int min=arr[0];
                int max=arr[0];
                for(int i=0; i<arr.length;i++){
                    if(arr[i]<min){
                        min=arr[i];
                    }
                    if(arr[i]>max){
                        max=arr[i];
                    }
                }
                System.out.println("Min Value is "+ min);
                System.out.println("Max value is "+max);


    }
}
