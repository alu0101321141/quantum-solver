//React - Redux
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// MUI imports
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'
import { Button, List } from '@mui/material'

// Fuctions
import { colorTokens } from '../Redux/reducers/ThemeFunctions/colorsTokensPallete';

//actions
import { getAlgorithms, clearAlgorithms } from '../Redux/actions/getAlgorithmActions'

// components
import { ListAlgorithm } from '../components/listOfAlgoritms'
import {BreadCrumbsComponent} from '../components/breadCrumbs'

const getAlgorithmsFunction = async (token: string, dispatch: any) => {
  await dispatch(getAlgorithms(token))
}

export const AlgorithmsInformation = () => {
  const theme = useTheme();
  const colorButton = colorTokens(theme.palette.mode).blueAccent[500];

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state: any) => state.login_reducer)
  const {isToken} = useSelector((state: any) => state.login_reducer)
  const { algorithmData } = useSelector((state: any) => state.getAlgorithms_reducer)

  if (algorithmData === "" && isToken) {
    getAlgorithmsFunction(token, dispatch)
  }

  const routesAlgorithmInfo = ['/algorithms']

  return (
    <div className="algorithmsInformation">
      <BreadCrumbsComponent routes={routesAlgorithmInfo} />
      <Container
        maxWidth="xl"
        sx={{
          marginY: 1,
          marginBottom: "2em",
          height: "100%",
          flexGrow: 0,
          minHeight: "60vh",
        }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 10,
            margin: "auto",
            height: "100%",
            padding: "2%",
          }}>
          <Box
            sx={{
              padding: 2,
              justifyContent: "center",
              display: "flex",
            }}>
            <Typography
              tabIndex={0}
              variant="h2"
              component="h2"
              sx={{
                fontFamily: '"Helvetica Neue"',
                fontWeight: "bold"
              }}
            >
              Algorithms Information
            </Typography>
          </Box>
          {
            algorithmData === "" && !isToken ? (
              <Box
                sx={{
                  padding: 2,
                  justifyContent: "center",
                  display: "flex",
                }}>
                <Button
                  tabIndex={0}
                  aria-label='Go to login Button'
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: colorButton,
                    justifyContent: "center",
                  }}
                  onClick={() =>
                    navigate("/login")
                  }
                >
                  <Typography 
                  variant='body1'
                  component='p'
                  sx={{ 
                    fontFamily: '"Helvetica Neue"', 
                    fontWeight: "bold" 
                    }}>
                    Go to login
                  </Typography>
                </Button>
              </Box>
            ) : (
              null
            )
          }
          {!isToken ? (
            <Box
              sx={{
                padding: 2,
                justifyContent: "center",
                display: "flex",
              }}>
              <Alert 
              severity="warning" 
              variant="filled"
              sx={{
                fontFamily: '"Helvetica Neue"', 
                fontWeight: "bold",
                color: "black",
              }}
              >
                {"You Need to be logged to see the algorithms information "}</Alert>
            </Box>
          ) : null}
          {algorithmData !== "" ? <ListAlgorithm listAlgorithm={algorithmData} /> : null}

          {
            algorithmData !== "" && !isToken ? (
              dispatch(clearAlgorithms())
            ) : (
              null
            )
          }

        </Paper>
      </Container>
    </div>
  )
}