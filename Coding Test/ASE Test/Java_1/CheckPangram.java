import java.util.Scanner;

public class CheckPangram {
    public static boolean isPangram(String input) {
        input = input.toLowerCase();      
        boolean[] alphabetPresent = new boolean[26];
                for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                alphabetPresent[ch - 'a'] = true;
            }
        }
                for (boolean letterPresent : alphabetPresent) {
            if (!letterPresent) {
                return false;
            }
        }
        
        return true;
    }

    public static void main(String[] args) {
        Scanner input=new Scanner(System.in);

        String str =input.nextLine(); 
        input.close();

        // "The quick brown fox jumps over the lazy dog";
        boolean result = isPangram(str);
        if (result) {
            System.out.println("It's a pangram!");
        } else {
            System.out.println("It's not a pangram.");
        }
    }
}
