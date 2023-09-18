#include <stdio.h>
#include <stdlib.h>

// Function to initialize the chessboard
void initializeBoard(int N, int board[N][N])
{
    int i, j;
    for (i = 0; i < N; i++)
    {
        for (j = 0; j < N; j++)
        {
            board[i][j] = 0;
        }
    }
}

// Function to check if a queen can be placed in the given row and column
int isSafe(int N, int board[N][N], int row, int col)
{
    int i, j;

    // Check the row
    for (i = 0; i < col; i++)
    {
        if (board[row][i] == 1)
        {
            return 0;
        }
    }

    // Check the upper diagonal on the left
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
    {
        if (board[i][j] == 1)
        {
            return 0;
        }
    }

    // Check the lower diagonal on the left
    for (i = row, j = col; i < N && j >= 0; i++, j--)
    {
        if (board[i][j] == 1)
        {
            return 0;
        }
    }

    return 1;
}

// Function to solve the N-Queens puzzle using backtracking
int solveQueens(int N, int board[N][N], int col)
{
    if (col >= N)
    {
        return 1; // All queens are placed successfully
    }

    int i;
    for (i = 0; i < N; i++)
    {
        if (isSafe(N, board, i, col))
        {
            board[i][col] = 1; // Place queen

            if (solveQueens(N, board, col + 1))
            {
                return 1; // Queen placement is successful, move to the next column
            }

            board[i][col] = 0; // If placing the queen in this row doesn't lead to a solution, backtrack
        }
    }

    return 0; // No solution found for this column
}

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: %s <board_size>\n", argv[0]);
        return 1;
    }

    int N = atoi(argv[1]);
    if (N < 1)
    {
        printf("Invalid board size. Please enter a positive integer.\n");
        return 1;
    }

    int board[N][N];
    initializeBoard(N, board);

    if (solveQueens(N, board, 0))
    {
        printf("Solution found:\n");
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N; j++)
            {
                printf("%c ", board[i][j] == 1 ? 'Q' : '.');
            }
            printf("\n");
        }
    }
    else
    {
        printf("Solution not found.\n");
    }

    return 0;
}
