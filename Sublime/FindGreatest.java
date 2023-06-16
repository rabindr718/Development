public class FindGreatest {
    public static void main(String[] args) {
        int arr[]={4,5,5,7687,9,6,7,43,1,14};
        int max=arr[0];
        for(int number :arr){
            if(number >max){
                max=number;
            }
        }
        System.out.println(max +" is Max in Array");
    }
}
