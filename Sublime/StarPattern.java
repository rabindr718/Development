import java.util.Scanner;
public class StarPattern {
    public static void main(String[] args) {
        Scanner input=new Scanner(System.in);
        System.out.print("Enter The Row Number ");
        int row=input.nextInt();
        int i, j;

        //Logic $4
        for(i=0; i<row; i++)
        {
            for(j=row-i; j>1; j--)
                {
                     System.out.print(" ");
                }
            for(j=0; j<=i; j++)
                {
                    System.out.print("* ");
                }
            System.out.println();
        }
    }
}
