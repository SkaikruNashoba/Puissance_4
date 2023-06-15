export class P4S3 {

    constructor(player1 = "red", player2 = "yellow", cols = 7, rows = 6, tokenSize = 70) {
        this.board = [];
        this.currentCols = [];

        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;

        this.cols = cols;
        this.rows = rows;

        this.numberOfTokens = 0
        this.tokenSize = tokenSize;

        this.currentPlayerDisplay = document.createElement('div');
        this.currentPlayerDisplay.style.textAlign = "center"
        document.querySelector('body').append(this.currentPlayerDisplay);


        this.ResetButtonCreate();
        this.CreateBoard();
        this.showCurrentPlayer();
        this.verifPlayer();

    }

    // vérifier la différence de couleur entre player 1 et 2
    verifPlayer() {
        if (this.player1 == this.player2) {
            this.gameOver = true
            this.currentPlayerDisplay.innerText = "Attention la couleur des joueurs est identique, veuillez changer une des couleurs ! ";
        } else {
            this.gameOver = false
        }
    }


    // Pour créer le style du plateau
    CreateBoard() {
        this.boardDisplay = document.createElement('div');
        this.boardDisplay.id = 'board';
        this.boardDisplay.style.display = "flex";
        this.boardDisplay.style.flexWrap = "wrap";
        this.boardDisplay.style.backgroundColor = "blue";
        this.boardDisplay.style.border = "5px solid black";
        this.boardDisplay.style.borderTop = "none"
        this.boardDisplay.style.borderRadius = "20px 20px 0 0"
        this.boardDisplay.style.margin = "70px auto"
        document.querySelector('body').append(this.boardDisplay);
    }



    // Pour créer la fonction de vérification de qui a gagner ou non ou égalité
    VerifWinPlayer(rows, cols) {
        if (this.board[rows][cols] == this.player1) {
            this.currentPlayerDisplay.innerText = "Le joueur : " + this.player1 + " à gagné !";
            document.querySelector('body').style.backgroundColor = this.player1;
            this.BtnReset.style.display = "block";
        } else {
            this.currentPlayerDisplay.innerText = "Le joueur : " + this.player2 + " à gagné !";
            document.querySelector('body').style.backgroundColor = this.player2;
            this.BtnReset.style.display = "block";
        }
        this.ClearBoard();
        this.gameOver = true;
    }

    // Pour vérifier les cas de win ou de lose ou d'égalité
    VerifWinCases() {

        // fonction d'appel en cas de win de manière horizontale
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols - 3; c++) {
                if (this.board[r][c] != ' ') {
                    if (
                        this.board[r][c] == this.board[r][c + 1] &&
                        this.board[r][c + 1] == this.board[r][c + 2] &&
                        this.board[r][c + 2] == this.board[r][c + 3]
                    ) {
                        this.VerifWinPlayer(r, c);
                        return;
                    }
                }
            }
        }

        // fonction d'appel en cas de win de manière verticale
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows - 3; r++) {
                if (this.board[r][c] != ' ') {
                    if (
                        this.board[r][c] == this.board[r + 1][c] &&
                        this.board[r + 1][c] == this.board[r + 2][c] &&
                        this.board[r + 2][c] == this.board[r + 3][c]
                    ) {
                        this.VerifWinPlayer(r, c);
                        return;
                    }
                }
            }
        }

        // fonction d'appel en cas de win de manière horaire
        for (let r = 0; r < this.rows - 3; r++) {
            for (let c = 0; c < this.cols - 3; c++) {
                if (this.board[r][c] != ' ') {
                    if (
                        this.board[r][c] == this.board[r + 1][c + 1] &&
                        this.board[r + 1][c + 1] == this.board[r + 2][c + 2] &&
                        this.board[r + 2][c + 2] == this.board[r + 3][c + 3]
                    ) {
                        this.VerifWinPlayer(r, c);
                        return;
                    }
                }
            }
        }


        // fonction d'appel en cas de win de manière anti-horaire
        for (let r = 3; r < this.rows; r++) {
            for (let c = 0; c < this.cols - 3; c++) {
                if (this.board[r][c] != ' ') {
                    if (
                        this.board[r][c] == this.board[r - 1][c + 1] &&
                        this.board[r - 1][c + 1] == this.board[r - 2][c + 2] &&
                        this.board[r - 2][c + 2] == this.board[r - 3][c + 3]
                    ) {
                        this.VerifWinPlayer(r, c);
                        return;
                    }
                }
            }
        }

        // fonction d'appel au reset en cas d'égalité
        if (this.numberOfTokens >= (this.rows * this.cols)) {
            this.BtnReset.style.display = "block";
            this.currentPlayerDisplay.innerText = "Il y a une égalité, veuillez appuyer sur le bouton de reset !";
        }
    }

    // Pour créer qui joue actuellement
    showCurrentPlayer() {
        this.currentPlayerDisplay.innerText = "C'est au tour du joueur : " + this.currentPlayer;
        document.querySelector('body').style.backgroundColor = this.currentPlayer;
    }

    // Pour calculer la taille du plateau
    CalculBoardSize() {
        this.w = (this.tokenSize + 20) * this.cols;
        this.h = (this.tokenSize + 20) * this.rows;
        this.boardDisplay.style.width = this.w + 'px';
        this.boardDisplay.style.height = this.h + 'px';
    }

    // Pour placer les tokens en fonction du click
    PutToken(e) {
        if (this.gameOver) { return }

        let coords = e.target.id.split('-');
        let row = parseInt(coords[0]);
        let col = parseInt(coords[1]);

        row = this.currentCols[col];

        if (row < 0) { return }

        this.board[row][col] = this.currentPlayer

        let token = document.getElementById(row.toString() + '-' + col.toString());

        if (this.currentPlayer == this.player1) {
            token.style.backgroundColor = this.player1;
            this.currentPlayer = this.player2;
            this.showCurrentPlayer()
        } else {
            token.style.backgroundColor = this.player2;
            this.currentPlayer = this.player1;
            this.showCurrentPlayer()
        }

        this.numberOfTokens++;
        row -= 1;
        this.currentCols[col] = row;
        this.VerifWinCases();
    }

    // Pour créer les emplacements des tokens
    CreateBody() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(' ');
                let createToken_location = document.createElement('div');
                createToken_location.id = `${r.toString()}-${c.toString()}`;
                createToken_location.style.width = this.tokenSize + "px";
                createToken_location.style.height = this.tokenSize + "px";
                createToken_location.style.margin = "5px";
                createToken_location.style.border = "5px solid black";
                createToken_location.style.backgroundColor = "white";
                createToken_location.style.borderRadius = "50%";
                createToken_location.addEventListener('click', (e) => {
                    this.PutToken(e);
                });
                document.getElementById('board').append(createToken_location);
            }
            this.board.push(row);
        }
    }

    // Pour créer une loop sur la game
    GameOfLoop() {
        this.CalculBoardSize();
        this.SetActualCol();
        this.CreateBody();
    }

    // Pour définir la colonne où l'on est
    SetActualCol() {
        for (let i = 0; i < this.cols; i++) {
            this.currentCols[i] = this.rows - 1;
        }
    }

    // Pour clear le plateau
    ClearBoard() {

        for (let r = 0; r < this.rows; r++) {

            for (let c = 0; c < this.cols; c++) {
                this.board[r][c] = ' ';
            }

        }
    }

    // Pour créer le bouton de reset du jeu
    ResetButtonCreate() {
        this.BtnReset = document.createElement('button');
        this.BtnReset.innerText = "Reset le jeu";
        this.BtnReset.id = "reset";
        this.BtnReset.style.display = "none";
        this.BtnReset.style.margin = "10px auto";
        this.BtnReset.style.padding = "10px";
        this.BtnReset.style.backgroundColor = "green";
        this.BtnReset.style.border = "1px solid black";
        this.BtnReset.style.borderRadius = "5px";
        this.BtnReset.addEventListener('click', () => {
            this.ResetAll();
        })
        document.querySelector('body').append(this.BtnReset);
    }

    // Fonction de reset
    ResetAll() {
        const childs = document.getElementById('board').childNodes

        for (let i = 0; i < childs.length; i++) {
            childs[i].style.backgroundColor = "white";
            this.gameOver = false;
        }

        this.SetActualCol()
        this.ClearBoard()

        document.querySelector('body').style.backgroundColor = this.currentPlayer;

        this.currentPlayerDisplay.innerText = "C'est au tour de " + this.currentPlayer + " de jouer !";
        this.BtnReset.style.display = "none";
        this.numberOfTokens = 0;
    }

}