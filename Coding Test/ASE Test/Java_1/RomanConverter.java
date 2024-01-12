import java.util.Scanner;

public class RomanConverter {
    
        public static String intToRoman(int number) {
            int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
            String[] numerals = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    
            StringBuilder roman = new StringBuilder();
            int i = 0;
    
            while (number > 0) {
                while (number >= values[i]) {
                    roman.append(numerals[i]);
                    number -= values[i];
                }
                i++;
            }
    
            return roman.toString();
        }
    
        public static void main(String[] args) {
            Scanner input=new Scanner(System.in);
            System.out.println("Enter The Number : ");
            int number =input.nextInt();
            String romanNumeral = intToRoman(number);
            System.out.println(number + " in Roman numerals is: " + romanNumeral);
        }
    }
    

