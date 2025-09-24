<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Tragaperras Simulada</title>
	<style>
		body {
			background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
			font-family: 'Segoe UI', Arial, sans-serif;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
		}
		.slot-machine {
			background: #fff;
			border-radius: 20px;
			box-shadow: 0 8px 32px rgba(0,0,0,0.2);
			padding: 40px 30px;
			text-align: center;
			width: 350px;
		}
		.reels {
			display: flex;
			justify-content: center;
			margin-bottom: 30px;
		}
			.reel {
				background: #fcb69f;
				border-radius: 10px;
				width: 60px;
				height: 60px;
				margin: 0 10px;
				font-size: 2.5em;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 2px 8px #ccc;
				transition: background 0.3s, transform 0.3s;
				animation: none;
			}
			.reel.spin {
				animation: spinReel 0.7s cubic-bezier(.68,-0.55,.27,1.55) 0s 1;
			}
			@keyframes spinReel {
				0% { transform: scale(1) rotateX(0deg); }
				40% { transform: scale(1.2) rotateX(180deg); }
				70% { transform: scale(1.1) rotateX(270deg); }
				100% { transform: scale(1) rotateX(360deg); }
			}
			.reel.jackpot {
				background: #ffe066;
				box-shadow: 0 0 20px 5px #ffe066;
				animation: jackpotFlash 1s linear 0s 2;
			}
			@keyframes jackpotFlash {
				0%, 100% { background: #ffe066; }
				50% { background: #fff176; }
			}
			.reel.win {
				background: #b2ff59;
				box-shadow: 0 0 15px 3px #b2ff59;
				animation: winFlash 0.7s linear 0s 2;
			}
			@keyframes winFlash {
				0%, 100% { background: #b2ff59; }
				50% { background: #d4fc79; }
			}
		.result {
			font-size: 1.3em;
			margin-bottom: 20px;
			color: #e67e22;
			min-height: 1.5em;
		}
		.spin-btn {
			background: #e67e22;
			color: #fff;
			border: none;
			border-radius: 8px;
			padding: 12px 40px;
			font-size: 1.2em;
			cursor: pointer;
			box-shadow: 0 2px 8px #ccc;
			transition: background 0.2s;
		}
		.spin-btn:hover {
			background: #d35400;
		}
		.credits {
			margin-top: 20px;
			font-size: 1.1em;
			color: #333;
		}
	</style>
</head>
<body>
	<div class="slot-machine">
		<div class="result" id="resultado"></div>
		<div class="reels">
			<div class="reel" id="reel1">🍒</div>
			<div class="reel" id="reel2">🍋</div>
			<div class="reel" id="reel3">🍊</div>
		</div>
		<button class="spin-btn" onclick="girar()">Girar</button>
		<div class="credits" id="creditos">Créditos: <span id="creditosNum">10</span></div>
	</div>
	<script>
		const simbolos = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔'];
		let creditos = 10;

			function girar() {
				if (creditos <= 0) {
					document.getElementById('resultado').textContent = '¡Sin créditos!';
					return;
				}
				creditos--;
				document.getElementById('creditosNum').textContent = creditos;

				// Animación de giro
				for (let i = 1; i <= 3; i++) {
					const reel = document.getElementById('reel' + i);
					reel.classList.remove('jackpot', 'win');
					reel.classList.add('spin');
				}

				setTimeout(() => {
					let reels = [];
					for (let i = 1; i <= 3; i++) {
						const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
						const reel = document.getElementById('reel' + i);
						reel.textContent = simbolo;
						reel.classList.remove('spin');
						reels.push(simbolo);
					}

					let resultado = '';
					if (reels[0] === reels[1] && reels[1] === reels[2]) {
						resultado = '¡Jackpot! +5 créditos';
						creditos += 5;
						for (let i = 1; i <= 3; i++) {
							document.getElementById('reel' + i).classList.add('jackpot');
						}
					} else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
						resultado = '¡Bien! +2 créditos';
						creditos += 2;
						// Resalta los carretes ganadores
						if (reels[0] === reels[1]) {
							document.getElementById('reel1').classList.add('win');
							document.getElementById('reel2').classList.add('win');
						}
						if (reels[1] === reels[2]) {
							document.getElementById('reel2').classList.add('win');
							document.getElementById('reel3').classList.add('win');
						}
						if (reels[0] === reels[2]) {
							document.getElementById('reel1').classList.add('win');
							document.getElementById('reel3').classList.add('win');
						}
					} else {
						resultado = 'Intenta de nuevo...';
					}
					document.getElementById('resultado').textContent = resultado;
					document.getElementById('creditosNum').textContent = creditos;
				}, 700);
			}
	</script>
</body>
</html>
