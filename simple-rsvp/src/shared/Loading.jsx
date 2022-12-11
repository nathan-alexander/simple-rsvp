import loading from '../../src/assets/loading.gif'

function Loading() {
    const styles = {
        display: 'block',
        margin: '0 auto',
    }
    return (
        <div>
            <img src={loading} width='50px' height='50px' style={styles} />
        </div>
    )
}

export default Loading
