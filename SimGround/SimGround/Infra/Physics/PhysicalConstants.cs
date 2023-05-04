namespace SimGround.Infra.Physics
{
    public class PhysicalConstants
    {
        // Planck constant (J * s)
        public const double PLANCK_CONSTANT = 6.62607015e-34; // CODATA 2018

        // Reduced Planck constant (J * s)
        public const double REDUCED_PLANCK_CONSTANT = 1.054571817e-34; // CODATA 2018

        // Speed of light in a vacuum (m/s)
        public const double SPEED_OF_LIGHT = 299792458; // CODATA 2018

        // Gravitational constant (N * m^2 / kg^2)
        public const double GRAVITATIONAL_CONSTANT = 6.67430e-11; // CODATA 2018
        public const double G = 9.81; // CODATA 2014

        // Coulomb constant (N * m^2 / C^2)
        public const double COULOMB_CONSTANT = 8.9875517923e9; // CODATA 2018

        // Avogadro constant (1/mol)
        public const double AVOGADRO_CONSTANT = 6.02214076e23; // CODATA 2018

        // Boltzmann constant (J/K)
        public const double BOLTZMANN_CONSTANT = 1.380649e-23; // CODATA 2018

        // Gas constant (J/mol * K)
        public const double GAS_CONSTANT = 8.314462618; // CODATA 2018

        // Faraday constant (C/mol)
        public const double FARADAY_CONSTANT = 96485.33212; // CODATA 2018

        // Stefan-Boltzmann constant (W/m^2 * K^4)
        public const double STEFAN_BOLTZMANN_CONSTANT = 5.670374419e-8; // CODATA 2018

        // Wien displacement law constant (m * K)
        public const double WIEN_DISPLACEMENT_CONSTANT = 2.897771955e-3; // CODATA 2018

        // Universal gas constant (J/mol * K)
        public const double UNIVERSAL_GAS_CONSTANT = 8.3144598; // IUPAC 1997

        // Rydberg constant (1/m)
        public const double RYDBERG_CONSTANT = 10973731.568160; // CODATA 2018

        // Vacuum permittivity (F/m)
        public const double VACUUM_PERMITTIVITY = 8.8541878128e-12; // CODATA 2018

        // Vacuum permeability (N/A^2)
        public const double VACUUM_PERMEABILITY = 1.25663706212e-6; // CODATA 2018

        // Elementary charge (C)
        public const double ELEMENTARY_CHARGE = 1.602176634e-19; // CODATA 2018

        // Magnetic constant (N/A^2)
        public const double MAGNETIC_CONSTANT = 1.25663706212e-6; // CODATA 2018

        // Electric constant (F/m)
        public const double ELECTRIC_CONSTANT = 1 / (PhysicalConstants.VACUUM_PERMEABILITY * PhysicalConstants.SPEED_OF_LIGHT * PhysicalConstants.SPEED_OF_LIGHT);
        public static readonly double NUCLEAR_MAGNETON = 5.0507837461e-27; // CODATA 2018
        // Bohr magneton (J/T)
        public const double BOHR_MAGNETON = 9.2740100783e-24; // CODATA 2018
                                                              // Conductance quantum (S)
        public static readonly double CONDUCTANCE_QUANTUM = 7.748091729e-5; // CODATA 2018

        // Josephson constant (Hz/V)
        public static readonly double JOSEPHSON_CONSTANT = 483597.8484e9; // CODATA 2018

        // Von Klitzing constant (Ohm)
        public static readonly double VON_KLITZING_CONSTANT = 25812.80745; // CODATA 2018

        // Atomic mass unit (kg)
        public static readonly double ATOMIC_MASS_UNIT = 1.66053906660e-27; // CODATA 2018

        // Electron mass (kg)
        public static readonly double ELECTRON_MASS = 9.1093837015e-31; // CODATA 2018

        // Proton mass (kg)
        public static readonly double PROTON_MASS = 1.67262192369e-27; // CODATA 2018

        // Neutron mass (kg)
        public static readonly double NEUTRON_MASS = 1.67492749804e-27; // CODATA 2018

        // Fine-structure constant
        public static readonly double FINE_STRUCTURE_CONSTANT = 7.2973525693e-3; // CODATA 2018
        public static readonly double BOHR_RADIUS = PhysicalConstants.FINE_STRUCTURE_CONSTANT * Math.Pow(PhysicalConstants.REDUCED_PLANCK_CONSTANT, 2) / (4 * Math.PI * PhysicalConstants.ELEMENTARY_CHARGE * PhysicalConstants.SPEED_OF_LIGHT); // NIST 2019

        // Electron volt (J)
        public static readonly double ELECTRON_VOLT = 1.602176634e-19; // CODATA 2018

        // Fermi coupling constant (GeV^-2)
        public static readonly double FERMI_COUPLING_CONSTANT = 1.1663787e-5; // PDG 2020

        // Neutrino mixing angle sin^2(theta_12)
        public static readonly double NEUTRINO_MIXING_ANGLE_SIN_SQUARED_12 = 0.297; // PDG 2020

        // Neutrino mixing angle sin^2(theta_13)
        public static readonly double NEUTRINO_MIXING_ANGLE_SIN_SQUARED_13 = 0.0215; // PDG 2020

        // Neutrino mixing angle sin^2(theta_23)
        public static readonly double NEUTRINO_MIXING_ANGLE_SIN_SQUARED_23 = 0.57; // PDG 2020

        // CP-violating phase in the PMNS matrix (degrees)
        public static readonly double CP_VIOLATING_PHASE_PMNS_DEGREES = 0; // PDG 2020

        // Weak mixing angle (degrees)
        public static readonly double WEAK_MIXING_ANGLE_DEGREES = 29.59; // PDG 2020

        // Weinberg angle (degrees)
        public static readonly double WEINBERG_ANGLE_DEGREES = 28.746; // PDG 2020

        // Dirac constant (J s)
        public static readonly double DIRAC_CONSTANT = PhysicalConstants.REDUCED_PLANCK_CONSTANT / 2;

        // Electric permittivity of vacuum (F/m)
        public static readonly double ELECTRIC_PERMITTIVITY_VACUUM = 8.8541878128e-12; // CODATA 2018

        // Electron Compton wavelength (m)
        public static readonly double ELECTRON_COMPTON_WAVELENGTH = PhysicalConstants.REDUCED_PLANCK_CONSTANT / (PhysicalConstants.ELECTRON_MASS * PhysicalConstants.SPEED_OF_LIGHT);
    }
}
