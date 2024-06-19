const socket = io();
const chess = new Chess();
const  boardElement = document.querySelector("#chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((squre, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex + squareindex)%2 === 0 ? "light" : "dark"
            );
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if(square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black")
                pieceElement.innnerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole = square.color;
                pieceElement.addEventListner("dragstart", () => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        squareSource = {row: rowindex, col: squareindex};
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListner("draggend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })
                source.appendChild(pieceElement);
            };
            squareElement.addEventListener("dragover", function(e){
                e.preventDefault();
            })
            squareElement.addEventListener("drop", function(e) {
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSource);
                }
            })
            
        });
        boardElement.appendChild(squareElement);
    })
    
};
const handleMove = () => {
    const move = {
        from: `${String.fromCharCode(97+source.col)}${8-source.row}`,
        to:`${String.fromCharCode(97+target.col)}${8-target.row}` ,
        promotion: 'q',
    }
    socket.emit("move", move);
};
const getPieceUnicode = (piece) => {
    const pieceMap = {
        'p': '♙', 'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔',
        'P': '♟', 'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚'
    };
    return unicodePieces[piece.type] || "";
};

socket.on("playerRole", function(player){
    playerRole = role;
    renderBoard();
})
socket.on("spectatorRole", function(){
    playerRole = null;
    renderBoard();
})
socket.on("boardState", function () {
    chess.load(fen);
    renderBoard();
})
socket.on("move", function () {
    chess.load(move);
    renderBoard();
})
renderBoard();