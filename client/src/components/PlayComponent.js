import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/warGameActions'
import cst from '../constants/cst'

import('../index.css');

class PlayComponent extends React.Component {
    renderCard(obj) {
        return (
            <div>
                {obj === undefined &&
                    <div className="cardFrame">
                        <div className="cardInner" style={{backgroundColor:'black'}}>
                            <p align="center">&nbsp;</p>
                            <p align="center">&nbsp;</p>
                        </div>
                    </div>
                }
                {obj !== undefined &&
                    <div className="cardFrame">
                        {obj.type === cst.SPADES &&
                            <div className="cardFrame">
                                <div className="cardInner">
                                    <p align="center"><span>&spades;</span></p>
                                    <p align="center"></p>
                                    {obj.val < 11 && <p align="center">{obj.val}</p>}
                                    {obj.val === 11 && <p align="center">J</p>}
                                    {obj.val === 12 && <p align="center">Q</p>}
                                    {obj.val === 13 && <p align="center">K</p>}
                                </div>
                            </div>
                        }
                        {obj.type === cst.CLUBS &&
                            <div className="cardFrame">
                                <div className="cardInner">
                                    <p align="center"><span >&clubs;</span></p>
                                    <p align="center"></p>
                                    {obj.val < 11 && <p align="center">{obj.val}</p>}
                                    {obj.val === 11 && <p align="center">J</p>}
                                    {obj.val === 12 && <p align="center">Q</p>}
                                    {obj.val === 13 && <p align="center">K</p>}
                                </div>
                            </div>
                        }
                        {obj.type === cst.HEARTS &&
                            <div className="cardFrame">
                                <div className="cardInner">
                                    <font color="red">
                                        <p align="center"><span>&hearts;</span></p>
                                        <p align="center"></p>
                                        {obj.val < 11 && <p align="center">{obj.val}</p>}
                                        {obj.val === 11 && <p align="center">J</p>}
                                        {obj.val === 12 && <p align="center">Q</p>}
                                        {obj.val === 13 && <p align="center">K</p>}
                                    </font>
                                </div>
                            </div>
                        }
                        {obj.type === cst.DIAMS &&
                            <div className="cardFrame">
                                <div className="cardInner">
                                    <font color="red">
                                        <p align="center"><span>&diams;</span></p>
                                        <p align="center"></p>
                                        {obj.val < 11 && <p align="center">{obj.val}</p>}
                                        {obj.val === 11 && <p align="center">J</p>}
                                        {obj.val === 12 && <p align="center">Q</p>}
                                        {obj.val === 13 && <p align="center">K</p>}
                                    </font>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    render() {
        const { war, location, dealer, setResetConfig, playGame } = this.props
        return (
            <div style={{ padding: '0px 10px', width: '80%', margin: 'auto' }}>
                {location.all.length > 0 &&
                    <h2 align="center"><strong>({location.active[0].name} - {location.active[0].address})</strong></h2>
                }
                <h3 align="center"><button type="button" className="btn" onClick={e => playGame()}>Play</button>&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn" onClick={e => setResetConfig()}>Set New Config</button>
                </h3>
                <div>
                    {war.playingCards.length > 0 &&
                        <table style={{ width: "100%" }}><tbody>
                            {/* ===================== Round Number ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "black", color: "#00FF00" }}><td colSpan="4"><h2 align="center"><b>Round {war.round}</b></h2></td></tr>
                            {/* ===================== Dealer's Name ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "#f2ecd6" }}><td colSpan="4">
                                {dealer.all.length > 0 && <h3 align="center"><b>{dealer.active[0].name}</b> (dealer)</h3>}
                            </td></tr>
                            {/* ===================== Cards on Dealer's Side ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "#f2ecd6" }}>
                                <td align="center" style={{ width: "23%" }}>
                                    <div>
                                        {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                        {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                            <div>
                                                {this.renderCard(war.playingCards[0].dealerCard)}
                                            </div>
                                        }
                                    </div>
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 1 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[1].dealerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 1 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 2 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[2].dealerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 2 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 3 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[3].dealerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 3 && <p>&nbsp;</p>}
                                </td>
                            </tr>
                            {/* ===================== Cards on Players' Side ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "#9cbcfc" }}>
                                <td align="center" style={{ width: "23%" }}>
                                    <div>
                                        {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                        {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                            <div>{this.renderCard(war.playingCards[0].playerCard)}</div>
                                        }
                                    </div>
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 1 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[1].playerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 1 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 2 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[2].playerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 2 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 3 &&
                                        <div>
                                            {war.status === cst.PLAY_CARDS_DISTRIBUTE && <div>{this.renderCard()}</div>}
                                            {(war.status === cst.PLAY_CARDS_SHOW || war.status === cst.PLAY_END) &&
                                                <div>{this.renderCard(war.playingCards[3].playerCard)}</div>
                                            }
                                        </div>
                                    }
                                    {war.playingCards.length <= 3 && <p>&nbsp;</p>}
                                </td>
                            </tr>
                            {/* ===================== Player Names ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "#9cbcfc" }}>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 0 && <h3><font color="blue"><b>{war.playingCards[0].name}</b></font></h3>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 1 && <h3><font color="blue"><b>{war.playingCards[1].name}</b></font></h3>}
                                    {war.playingCards.length <= 1 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 2 && <h3><font color="blue"><b>{war.playingCards[2].name}</b></font></h3>}
                                    {war.playingCards.length <= 2 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 3 && <h3><font color="blue"><b>{war.playingCards[3].name}</b></font></h3>}
                                    {war.playingCards.length <= 3 && <p>&nbsp;</p>}
                                </td>
                            </tr>
                            {/* ===================== Number of Won Cards ===================== */}
                            <tr style={{ width: "100%", border: "2px solid black", backgroundColor: "#9cbcfc" }}>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 0 && <h3><font color="blue"><b>#Cards: {war.playingCards[0].cardsWon.length}</b></font></h3>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 1 && <h3><font color="blue"><b>#Cards: {war.playingCards[1].cardsWon.length}</b></font></h3>}
                                    {war.playingCards.length <= 1 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 2 && <h3><font color="blue"><b>#Cards: {war.playingCards[2].cardsWon.length}</b></font></h3>}
                                    {war.playingCards.length <= 2 && <p>&nbsp;</p>}
                                </td>
                                <td align="center" style={{ width: "23%" }}>
                                    {war.playingCards.length > 3 && <h3><font color="blue"><b>#Cards: {war.playingCards[3].cardsWon.length}</b></font></h3>}
                                    {war.playingCards.length <= 3 && <p>&nbsp;</p>}
                                </td>
                            </tr>
                        </tbody></table>
                    }
                </div>
                {war.status === cst.PLAY_END &&
                    <div>Game Over!</div>
                }
            </div>
        )
    }
}

const warPlaying = (state) => {
    //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    console.log("PlayComponent/warPlaying/state.war.playingCards: " + JSON.stringify(state.war.playingCards, null, 5))
    return state.war
}

const mapStateToProps = (state) => ({
    war: warPlaying(state),//state.war,
    location: state.locations,
    dealer: state.dealers,
})

export default connect(mapStateToProps, actions)(PlayComponent)