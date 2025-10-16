import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-B7Dvl8Jj.js";import{w as d,c as D}from"./ContextDecorators-BqQKQ7xY.js";import{F as N,A as v}from"./FullførtStilling-Dk71M6TO.js";import{R as T}from"./GjenåpneStillingKnapp-6Qw9wSy_.js";import{T as A}from"./TilgangskontrollForInnhold-DQRSGsT8.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CAMVLGED.js";import"./OrganisasjonsnummerAlert-B6979mxN.js";import"./VStack-DoVBdUwh.js";import"./BasePrimitive-nhlMJXy5.js";import"./List-DNLBbsF6.js";import"./Link-COJzWWgd.js";import"./KandidatHendelseTag-DMgWv75R.js";import"./Tag-Dbhe3dYd.js";import"./ChatExclamationmark-6oiWjU16.js";import"./FileXMark-CInp8YnZ.js";import"./Trash-VxLSmphO.js";import"./HandShakeHeart-DSIbfxNS.js";import"./Calendar-CR0WuzSg.js";import"./ThumbUp-CphuqJm_.js";import"./Table-B3A3EwWy.js";import"./util-BR3FpXOQ.js";import"./format-CHTUKnSm.js";import"./match-B-AXo-40.js";import"./parseISO-DHeRfjNk.js";import"./parse-2ma9X7Vh.js";import"./getDefaultOptions-B4Vf2YIU.js";import"./util-DGfqc-Ar.js";import"./accordion-CkEqf8mt.js";import"./index-Bgc8Wo05.js";import"./index-CG824_yy.js";import"./index-BsbkDzjh.js";import"./ChevronDown-ByQIB4O1.js";import"./Box-DuFDghgU.js";import"./Bell-Bm2PuLoc.js";import"./PersonChat-B1plQAwv.js";import"./Eye-Bzvpvj3Z.js";import"./ProgressBar-CtuO3wFa.js";import"./EyeSlash-DHkjdBtM.js";import"./CircleSlash-C8ewjTLH.js";import"./Modal-C4YlaOo0.js";import"./floating-ui.react-LZWfpoWL.js";import"./Date.Input-BRCpBEIO.js";import"./useFormField-DS52_5yK.js";import"./useControllableState-BCdW65Bd.js";import"./Modal.context-BGzr1iqs.js";import"./Checkbox-CJMGQDeu.js";import"./Fieldset-IFh57OHA.js";import"./Pencil-BqqEy_lV.js";import"./PersonbrukerTekst-BAQMaFD0.js";import"./ClockDashed-DwKTmuMU.js";import"./Tasklist-rUPDg8fA.js";import"./ErrorBoundary-axpWCniJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
