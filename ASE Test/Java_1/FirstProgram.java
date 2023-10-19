public class FirstProgram {
    public int[] shuffleP(int[] nums, int n) {
        int len = 2 * n;
        int[] ans = new int[len];
        int x = 0, y = n;
        int a = 0;

        while (a < len) {
            ans[a++] = nums[x++];
            ans[a++] = nums[y++];
        }
        return ans;
    }

    public static void main(String[] args) {
        FirstProgram program = new FirstProgram();
        int[] inputArray = {1, 2, 3, 4, 5, 6};
        int n = 3;

        int[] shuffledArray = program.shuffleP(inputArray, n);
        for (int num : shuffledArray) {
            System.out.print(num + " ");
        }
    }
}
