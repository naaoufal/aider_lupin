import { Link } from 'react-router-dom'


function NormalAdmin () {
    return (
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="#">Home</Link></li>
                    <li class="active">Normal Admin access</li>
                    <div className="row">
                        <article class="col-xs-12 maincontent">
                            <header class="page-header">
                                <h1 class="page-title">Sign in</h1>
                            </header>
                            <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <h3 class="thin text-center">Normal Admin Panel</h3>
                                        <hr />
                                        <form>
                                            <div class="top-margin">
                                                <label>Email <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" required />
                                            </div>
                                            <div class="top-margin">
                                                <label>Password <span class="text-danger">*</span></label>
                                                <input type="password" class="form-control" required />
                                            </div>

                                            <hr/>

                                            <div class="row">
                                                <div class="col-lg-8">
                                                </div>
                                                <div class="col-lg-4 text-right">
                                                    <button class="btn btn-action" type="submit">Sign in</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </ol>
            </div>
    )
}

export default NormalAdmin