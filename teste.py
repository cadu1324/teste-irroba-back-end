import random

def simulate_match(team1_id, team2_id):
  # Lógica para simular a partida com base nos IDs dos times
  # ... (sua lógica aqui)

  # Exemplo simples:
  score1 = random.randint(0, 5)
  score2 = random.randint(0, 5)
  print(score1)
  print(score2)

if __name__ == "__main__":
  import sys
  team1_id = int(sys.argv[1])
  team2_id = int(sys.argv[2])
  simulate_match(team1_id, team2_id)