
from ai.models.model import Model
from qiskit_machine_learning.algorithms.classifiers import VQC
from qiskit.circuit.library import RealAmplitudes
from qiskit.circuit.library import ZZFeatureMap
from qiskit.circuit.library import EfficientSU2
from qiskit.algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
import matplotlib.pyplot as plt
from IPython.display import clear_output

plt.rcParams["figure.figsize"] = (12, 6)

class QS_VQC(Model):
  def __init__(self):
    super().__init__('VQC', 'Variational Quantum Classifier')

  def set_model(self, args):
    n_qubits = args[0]
    self.model = VQC(
      sampler=Sampler(),
      feature_map=ZZFeatureMap(feature_dimension=n_qubits, reps=1),
      ansatz=RealAmplitudes(num_qubits=n_qubits, reps=3),
      optimizer=COBYLA(maxiter=100),
      callback=self.callback_graph,
    )

  def callback_graph(self, weights, obj_func_eval):
    clear_output(wait=True)
    self.objective_func_vals.append(obj_func_eval)
    plt.title("Objective function value against iteration")
    plt.xlabel("Iteration")
    plt.ylabel("Objective function value")
    plt.plot(range(len(self.objective_func_vals)), self.objective_func_vals, color='blue')
    plt.show(block=False)
    plt.pause(0.001)
