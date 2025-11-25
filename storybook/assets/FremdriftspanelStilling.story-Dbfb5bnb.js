import{aL as I,Q as w,j as t,w as k,S as j,cA as x,cI as b,cH as g,cB as u,W as y,cX as _}from"./iframe-Cb_tEQhr.js";import{w as m,c as D}from"./ContextDecorators-cpsJlDbX.js";import{F as N,A as v}from"./FullførtStilling-D1m8kUyy.js";import{R as T}from"./GjenåpneStillingKnapp-CSS3mjsA.js";import{T as A}from"./TilgangskontrollForInnhold-DmDxXcnn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BnCWjw_c.js";import"./OrganisasjonsnummerAlert-rFOKluri.js";import"./VStack-BF6CQz7r.js";import"./BasePrimitive-CjUx5R6Q.js";import"./List-Q3akeOZU.js";import"./Link-By8fj0RR.js";import"./KandidatHendelseTag-CuyYx9OW.js";import"./Tag-DTdzcQHr.js";import"./ChatExclamationmark-hnQ3EilH.js";import"./FileXMark-BrPH6AFj.js";import"./Trash-I0HNZ4vA.js";import"./HandShakeHeart-DPL39k2f.js";import"./Calendar-D0Df8Rs_.js";import"./ThumbUp-DCp6vNGP.js";import"./Table-DMgHc776.js";import"./dato-B5MZd2kF.js";import"./parse-BM__I-39.js";import"./getDefaultOptions-CUz3V4OU.js";import"./parseISO-15HIodIa.js";import"./index-8U9Br2Q7.js";import"./index-B40KJ5b4.js";import"./util-CMxWB8VY.js";import"./DatoVelger-wc_UbJe1.js";import"./useDatepicker-D9141LpZ.js";import"./useControllableState-sczq1XDD.js";import"./Modal-CxDUfJGc.js";import"./floating-ui.react-C8n_ZStl.js";import"./Date.Input-9jT1Lvgr.js";import"./useFormField-DFxSxc2F.js";import"./ChevronDown-DVgyIXbK.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DGMrKY-N.js";import"./Modal.context-CaVH4yK8.js";import"./Popover-6DuQgIDe.js";import"./DismissableLayer-DZ0-rpcq.js";import"./startOfMonth-4vCbNgIu.js";import"./Select-BwU1hwHL.js";import"./endOfMonth-I1QQIOtu.js";import"./ArrowLeft-DQnWeNi2.js";import"./ArrowRight-Drn-ixre.js";import"./isSameDay-B_EM_PjJ.js";import"./Checkbox-DLKvtWfC.js";import"./Fieldset-DW7ft6m-.js";import"./accordion-JcHYQTEz.js";import"./index-Bj9jwNqc.js";import"./index-By4qzhi3.js";import"./index-Bsr3_Ip4.js";import"./Box-B2xKaxHG.js";import"./Bell-CcLZeMZE.js";import"./PersonChat-BtXSDNrF.js";import"./Eye-BjRkN9W0.js";import"./ProgressBar-d7Q-OIoC.js";import"./useLatestRef-CLkAHq4F.js";import"./EyeSlash-CjTlngG3.js";import"./CircleSlash-Bq-GOaQO.js";import"./Pencil-Dilr86s3.js";import"./FullførStillingModal-KfGIiNGp.js";import"./PersonbrukerTekst-CVhFlcLv.js";import"./ClockDashed-BWIANSWY.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-kpvIf_s4.js";import"./ErrorBoundary-JvMTLOba.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
