public class MinMax2{
	public static void main(String[] args) {
		int []arr={3,4,5,6,7,8,2,98,65,1};

		int min=Integer.MAX_VALUE;
		int max=Integer.MIN_VALUE;


		for(int array:arr){
			if(array<min){
				min=array;
			}
			if(array>max){
				max=array;
			}
		}
		System.out.println("Min "+ min);
				System.out.println("Max "+ max);


	}
}