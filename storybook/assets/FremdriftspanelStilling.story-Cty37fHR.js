import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-B9qi-KGR.js";import{w as d,c as D}from"./ContextDecorators-pc9Fvee2.js";import{F as N,A as v}from"./FullførtStilling-Bvhcox9f.js";import{R as T}from"./GjenåpneStillingKnapp-s9iMoJqL.js";import{T as A}from"./TilgangskontrollForInnhold-BNA2OxG9.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-t437p4ne.js";import"./OrganisasjonsnummerAlert-CpQm-D8c.js";import"./VStack-B_-iknN3.js";import"./BasePrimitive-3ttinvqw.js";import"./List-C3zLaTJK.js";import"./Link-8NZQ7ys1.js";import"./KandidatHendelseTag-BhFCRt7S.js";import"./Tag-C72TaRLw.js";import"./FileXMark-Qm86sBR-.js";import"./Trash-BMPleXSU.js";import"./HandShakeHeart-CIJpddoL.js";import"./Calendar-CMY7Z5Id.js";import"./ThumbUp-BIcAzq2P.js";import"./Table-BnVQs5kX.js";import"./util-Bz9xGlOD.js";import"./format-DWsGMAW-.js";import"./match-BvrA9PW9.js";import"./parseISO-DHGxqYBc.js";import"./parse-CaQ_bvNr.js";import"./getDefaultOptions-BMsDcF0o.js";import"./util-C7hLCw15.js";import"./accordion-7k7AFd6r.js";import"./index-C57q-m8z.js";import"./index-CsLCHI-N.js";import"./index-FpTNhKay.js";import"./ChevronDown-azIsXyJw.js";import"./Box-DHFZsH2J.js";import"./Bell-DLGAQnKx.js";import"./PersonChat-DavWeCqV.js";import"./Eye-D-nhALDu.js";import"./ProgressBar-CN2KyBqk.js";import"./EyeSlash-CSEJAUyQ.js";import"./CircleSlash-Ube9N45G.js";import"./Modal-DTKPtxyv.js";import"./floating-ui.react-B0Q1Z0Uj.js";import"./Date.Input-DJCEhbTs.js";import"./useFormField-BLSmHyXC.js";import"./useControllableState-Bzw8feKc.js";import"./Modal.context-B6t6lyUq.js";import"./Checkbox-Cjg6rwMX.js";import"./Fieldset-q0-oD5H7.js";import"./Pencil-DFdCMJE3.js";import"./PersonbrukerTekst-B4KyuExO.js";import"./ClockDashed-DfBRAnUw.js";import"./Tasklist-DYJXe7_0.js";import"./ErrorBoundary-U2mTCLVO.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
