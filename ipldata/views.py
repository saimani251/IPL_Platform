from django.shortcuts import render
import pandas as pd
import pickle
from django.conf import settings
# Create your views here.

try:
    random_forest_model = pickle.load(open(settings.MODEL_FILE_PATH,'rb'))
except FileNotFoundError:
    print("Model file not found.")
    random_forest_model = None  # Handle the case where the model isn't loaded
def home(request):
    return render(request, 'ipltest.html')
def batting(request):
    return render(request,'batting.html')
def bowling(request):
    return render(request,'bowling.html')
def match(request):
    return render(request, 'match.html')
def predictions(request):
    return render(request, 'predictions.html')
def result(request):
    context = {}  # Initialize context to pass to template

    if request.method == 'POST':
        if random_forest_model is not None:
            try:
                # Retrieve data from the form
                batting_team = request.POST.get('batting_team')
                bowling_team = request.POST.get('bowling_team')
                city = request.POST.get('city')
                target = int(request.POST.get('target'))
                current_score = int(request.POST.get('score'))
                wickets_lost = int(request.POST.get('wickets'))
                overs_bowled = int(request.POST.get('overs'))

                # Calculate derived metrics
                runs_left = target - current_score
                balls_left = 120 - (overs_bowled * 6)
                wickets_remaining = 10 - wickets_lost
                current_run_rate = current_score / overs_bowled
                required_run_rate = runs_left / (balls_left / 6)

                # Prepare data for prediction
                input_data = pd.DataFrame({
                    'batting_team': [batting_team],
                    'bowling_team': [bowling_team],
                    'city': [city],
                    'runs_left': [runs_left],
                    'balls_left': [balls_left],
                    'wickets_remaining': [wickets_remaining],
                    'TotalRuns_x': [target],
                    'curr_run_rate': [current_run_rate],
                    'req_run_rate': [required_run_rate]
                })

                # Predict using the loaded model
                result = random_forest_model.predict_proba(input_data)
                loss_probability = result[0][0]
                win_probability = result[0][1]

                # Add results to context
                context.update({
                    'loss': loss_probability*100,
                    'win': win_probability*100,
                    'batting_team': batting_team,
                    'bowling_team': bowling_team,

                })
            
            except Exception as e:
                context['error'] = "Error processing the prediction: {}".format(str(e))
        else:
            context['error'] = "Prediction model is not loaded."
    else:
        # Optionally, handle non-POST methods or return an error
        context['error'] = "This method only handles POST requests."

    # Render the predictions page with the context
    return render(request, 'predictions.html', context)